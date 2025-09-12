import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image
import os
import json

class_names = list("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")


# -----------------------------
# Model Definition
# -----------------------------
class SignLangCNN(nn.Module):
    def __init__(self, 
                 num_classes=36, 
                 dropout_rate=0.3, 
                 conv_channels=[32, 64, 128],
                 linear_size=256,
                 activation="relu",
                 kernel_size=3):
        super(SignLangCNN, self).__init__()
        self.activation = activation

        assert len(conv_channels) == 3, "conv_channels must contain exactly 3 values"

        c1, c2, c3 = conv_channels

        self.conv1 = nn.Conv2d(1, c1, kernel_size=kernel_size, padding=kernel_size // 2)
        self.pool1 = nn.MaxPool2d(2, 2)

        self.conv2 = nn.Conv2d(c1, c2, kernel_size=kernel_size, padding=kernel_size // 2)
        self.pool2 = nn.MaxPool2d(2, 2)

        self.conv3 = nn.Conv2d(c2, c3, kernel_size=kernel_size, padding=kernel_size // 2)
        self.pool3 = nn.MaxPool2d(2, 2)

        self.flattened_size = c3 * 16 * 16
        self.fc1 = nn.Linear(self.flattened_size, linear_size)
        self.dropout = nn.Dropout(dropout_rate)
        self.fc2 = nn.Linear(linear_size, num_classes)

    def forward(self, x):
        if self.activation == "relu":
            activation = F.relu
        elif self.activation == "sigmoid":
            activation = torch.sigmoid
        else:
            raise ValueError(f"Unsupported activation: {self.activation}")

        x = self.pool1(activation(self.conv1(x)))
        x = self.pool2(activation(self.conv2(x)))
        x = self.pool3(activation(self.conv3(x)))
        x = x.view(x.size(0), -1)
        x = self.dropout(activation(self.fc1(x)))
        x = self.fc2(x)
        return x


# -----------------------------
# Load Model
# -----------------------------
def load_cnn_model(filename="asl_classification_model_cnn.pt"):
    path = os.path.join(os.path.dirname(__file__), filename)
    state_dict = torch.load(path, map_location=torch.device('cpu'))

    model = SignLangCNN(
        num_classes=36,
        dropout_rate=0.2062,
        conv_channels=[32, 64, 128],
        activation="relu",
        kernel_size=5,
        linear_size=382
    )
    model.load_state_dict(state_dict)
    model.eval()
    return model


# -----------------------------
# Preprocessing
# -----------------------------
transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor()
])


def image_to_tensor(path):
    image = Image.open(path).convert("L")
    return transform(image).unsqueeze(0)  # [1, 1, 128, 128]


def predict(model, image_tensor):
    with torch.no_grad():
        output = model(image_tensor)
        probabilities = torch.softmax(output[0], dim=0)
    return [
        {"label": class_names[i], "confidence": float(prob)}
        for i, prob in enumerate(probabilities)
    ]


# -----------------------------
# Run inference over a directory
# -----------------------------
if __name__ == "__main__":
    model = load_cnn_model()

    image_dir = "images"   # folder containing your images
    results = {}

    for i, fname in enumerate(os.listdir(image_dir)):
        print(f"computing image {i}")
        if fname.lower().endswith((".jpg", ".jpeg", ".png")):
            path = os.path.join(image_dir, fname)
            tensor = image_to_tensor(path)
            results[fname] = predict(model, tensor)

    # Save all predictions into JSON
    with open("predictions.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print(f"✅ Saved predictions for {len(results)} images to predictions.json")
