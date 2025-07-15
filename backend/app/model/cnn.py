import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image
import io
import os

from app.model.classes import class_names

class SignLangCNN(nn.Module):
    def __init__(self, 
                 num_classes=36, 
                 dropout_rate=0.3, 
                 conv_channels=[32, 64, 128],
                 linear_size=256,
                 activation="relu",
                 kernel_size=3):
        """
        Args:
            num_classes (int): Number of output classes.
            dropout_rate (float): Dropout rate for regularization.
            conv_channels (list): List of output channels for each Conv layer.
        """
        super(SignLangCNN, self).__init__()
        self.activation = activation

        assert len(conv_channels) == 3, "conv_channels must contain exactly 3 values"

        c1, c2, c3 = conv_channels

        self.conv1 = nn.Conv2d(1, c1, kernel_size=kernel_size, padding=kernel_size // 2)   # [B, c1, 128, 128]
        self.pool1 = nn.MaxPool2d(2, 2)                           # [B, c1, 64, 64]

        self.conv2 = nn.Conv2d(c1, c2, kernel_size=kernel_size, padding=kernel_size // 2)  # [B, c2, 64, 64]
        self.pool2 = nn.MaxPool2d(2, 2)                           # [B, c2, 32, 32]

        self.conv3 = nn.Conv2d(c2, c3, kernel_size=kernel_size, padding=kernel_size // 2)  # [B, c3, 32, 32]
        self.pool3 = nn.MaxPool2d(2, 2)                           # [B, c3, 16, 16]

        self.flattened_size = c3 * 16 * 16
        self.fc1 = nn.Linear(self.flattened_size, linear_size)
        self.dropout = nn.Dropout(dropout_rate)
        self.fc2 = nn.Linear(linear_size, num_classes)

    def forward(self, x):
        activation = None
        if (self.activation == "relu"):
            activation = F.relu
        elif (self.activation == "sigmoid"):
            activation = F.sigmoid
        else:
            raise ValueError(f"Unsupported activation function: {self.activation}")
        x = self.pool1(activation(self.conv1(x)))  # [B, c1, 64, 64]
        x = self.pool2(activation(self.conv2(x)))  # [B, c2, 32, 32]
        x = self.pool3(activation(self.conv3(x)))  # [B, c3, 16, 16]
        x = x.view(x.size(0), -1)             
        x = self.dropout(activation(self.fc1(x)))
        x = self.fc2(x)                        
        return x

def load_cnn_model(filename="asl_classification_model_cnn.pt"):
    path = os.path.join(os.path.dirname(__file__), filename)
    state_dict = torch.load(path, map_location=torch.device('cpu'))

    model = SignLangCNN(36, 0.2062, [32, 64, 128], activation="relu", kernel_size=5, linear_size=382)
    model.load_state_dict(state_dict)
    model.eval()
    return model

transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor()
])

def image_bytes_to_tensor(image_bytes: bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("L")
    tensor = transform(image).unsqueeze(0) # Add batch dimension: [1, 1, H, W]
    return tensor

def predict(model, image_tensor):
    with torch.no_grad():
        output = model(image_tensor)
        probabilities = torch.softmax(output[0], dim=0)
    return [
        {'label': class_names[i], 'confidence': float(prob)}
        for i, prob in enumerate(probabilities)
    ]