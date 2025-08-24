'use client'

import React from "react";
import { Text } from "@/components/ui/typography";
import { MathJaxContext } from 'better-react-mathjax';
import { Formula } from "@/components/ui/formula";

import { CnnClassifierArchitecture } from "@/components/report/CnnClassifierArchitecture";
import { DataAnalysisAugmentedChart } from "@/components/report/DataAnalysisAugmentedChart";
import { CnnMetricsChart } from "@/components/report/CnnMetricsChart";
import { ConfusionMatrixCNNvsSVM } from "@/components/report/ConfusionMatrixCNNvsSVMChart";
import { DataAnalysisChart } from "@/components/report/DataAnalysisChart";
import { HyperparameterTable } from "@/components/report/HyperparameterTable";
import { ModelAccuracyTable } from "@/components/report/ModelAccuracyTable";


const mathJaxConfig = {
  loader: { load: ['input/tex', 'output/chtml'] },
};

const ReportPage = () => {
  return (
  <MathJaxContext version={3} config={mathJaxConfig}>
    <div className="-z-1 absolute bg-linear-to-b from-transparent from-0% to-gray-50 to-2% w-full h-[calc(100%-var(--spacing)*60)] top-60 left-0"></div>

    <div className="max-w-[900px] mx-auto mt-32 py-10 font-sans text-gray-800">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Sign Language Classification Report</h1>
        <Text as="p" element="p" className="mb-1 font-medium">Authors: Dominik Schweigl, Emanuel Schöpf</Text>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">I. Introduction</h2>
        <Text as="p" element="p" >
          This project focuses on the classification of American Sign Language (ASL) hand gestures using machine learning models.
          The dataset consists of 9,680 grayscale images of hands, each sized at <Formula tex="128 \times 128" /> pixels.
          Each image represents a gesture corresponding to the digits 0-9 or the lowercase letters a-z,
          totaling 36 distinct classes.
        </Text>

        <Text as="p" element="p" className="mt-3">
          Notably, the dataset is imbalanced. Class frequencies range from <Formula tex="1.07\%" /> to <Formula tex="5.78\%" />.
          Specifically, 9 classes make up <Formula tex="5.78\%" /> of the data each, 6 classes occur at <Formula tex="2.89\%" />, 
          and the remaining classes appear roughly <Formula tex="1.50\%" /> of the time. This imbalance presents unique challenges 
          for training robust and fair classifiers.
        </Text>
        
        <DataAnalysisChart />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">II. Implementation / ML Process</h2>

        <Text as="p" element="p">
          The methods chosen for this task are a convolutional neural network (CNN), a multilabel support-vector machine (SVM) classifier, 
          as well as an autoencoder combined with a fully connected neural network.
        </Text>

        <h3 className="text-xl font-semibold mt-4 mb-1">A. Data Preprocessing</h3>
        <Text as="p" element="p">
          To avoid bias toward minority classes, incorrect class distributions, or misleading metrics, the dataset was balanced by augmenting 
          underrepresented classes using horizontal mirroring and <Formula tex="\pm 90^\circ" /> rotations as needed. 
          This yielded <Formula tex="18{,}056" /> instances with class frequencies between <Formula tex="2.48\%" /> and <Formula tex="3.10\%" />. 
          Input pixels were scaled to <Formula tex="[0, 1]" /> to reduce sensitivity to high-magnitude values, and the dataset was partitioned 
          into <Formula tex="80\%" /> for training and <Formula tex="20\%" /> for validation.
        </Text>

        <DataAnalysisAugmentedChart/>

        <Text as="p" element="p" className="mt-8">
          For the CNN and autoencoder, additional data was needed to significantly increase accuracy. A dynamic data loader expanded exclusively 
          the training set by a factor of <Formula tex="2" /> through random <Formula tex="\pm 15^\circ" /> rotations, 
          horizontal flips, and scaling between <Formula tex="80\%" /> and <Formula tex="100\%" />, resulting in <Formula tex="28{,}890" /> balanced 
          training and <Formula tex="3{,}611" /> validation instances. For the SVM, the <Formula tex="128 \times 128" /> image dimensionality made direct training infeasible. 
          Principal component analysis (PCA) was applied to reduce dimensionality to <Formula tex="200" /> components, 
          retaining <Formula tex="90\%" /> of the variance.
        </Text>

        <h3 className="text-xl font-semibold mt-4 mb-1">B. Classifier Architecture</h3>

        <Text as="p" element="p">
          A convolutional neural network (CNN) was chosen for this task due to its effectiveness in processing image data. 
          CNNs use local receptive fields to focus on small image regions, capturing spatial patterns and relationships 
          more effectively than fully connected networks.
        </Text>

        <Text as="p" element="p" className="mt-3">
          The architecture begins with convolutional layers that apply small filters (kernels) to detect local patterns such as edges 
          and textures. As training progresses, these kernels learn to extract features relevant to the classification task. 
          Pooling layers reduce the spatial dimensions of feature maps, thereby extracting higher-level features. At the end, 
          fully connected layers aggregate the high-level features and map them to output classes. The chosen CNN consists of 
          three convolutional layers (each followed by <Formula tex="2 \times 2" /> max pooling) and two fully connected layers.
        </Text>

        <CnnClassifierArchitecture />

        <Text as="p" element="p">
          An autoencoder with a fully connected classification head was also implemented as a two-step pipeline. The encoder shares the 
          same architecture as the CNN to learn compact feature representations. The decoder mirrors this structure using upsampling 
          and transposed convolutions to reconstruct the original image from the encoded features. Once trained to minimize reconstruction 
          error, the encoder output is fed to two fully connected layers that perform the classification.
        </Text>

        <Text as="p" element="p" className="mt-3">
          The support vector machine (SVM), implemented via <Formula tex="\texttt{sklearn.svm.SVC}" />, was chosen for its ability to 
          maximize the soft margin between classes. SVMs generalize better than logistic regression when classes aren’t linearly separable 
          by using kernel functions, which enable non-linear decision boundaries via the kernel trick.
        </Text>

        <Text as="p" element="p" className="mt-3">
          SVMs separate classes by finding the hyperplane that maximizes the margin defined by the nearest data points (support vectors). 
          Multi-class classification is handled using one-vs-rest (OvR) or one-vs-one (OvO) strategies, both supported by 
          <Formula tex="\texttt{scikit-learn}" />. SVMs minimize hinge loss: <Formula tex={`L_{\\text{hinge}} = \\max(0, 1 - y \\cdot f(x))`} />,
          where <Formula tex={`f(x) = \\mathbf{w}^\\top \\mathbf{x} + b`} /> and <Formula tex={`y \\in \\{0, 1\\}`} />. Compared to log-loss used 
          in logistic regression, hinge loss penalizes misclassifications less aggressively, making SVMs more robust to outliers.
        </Text>

        <Text as="p" element="p" className="mt-3">
          We excluded random forests, as raw pixels are weak features and the method scales poorly with many classes, 
          though this method could return good results in combination with dimensionality reduction. Logistic regression 
          was also omitted, as we expected the problem to be non-linear, which makes SVMs more suitable through kernel-based decision boundaries.
        </Text>

        <h3 className="text-xl font-semibold mt-4 mb-1">C. Hyperparameters</h3>
        <Text as="p" element="p">
          Hyperparameter optimization was performed using random search. For each parameter, either a numerical interval <Formula tex="[a, b]" /> or
          a discrete set <Formula tex="\{c, d, e, \dots\}" /> was defined. Across 
          <Formula tex="60" /> trials per classifier, parameters were uniformly sampled and used to train models evaluated 
          on the validation set. The best-performing configuration was selected based on validation performance, 
          as shown in Table I.
        </Text>

        <Text as="p" element="p" className="mt-3">
          For the CNN and autoencoder classifiers, random search was limited to <Formula tex="40" /> training epochs 
          with early stopping using a patience of <Formula tex="5" /> and a minimum improvement in validation loss 
          of <Formula tex="0.01" />. Training was also stopped early if validation accuracy remained below <Formula tex="40\%" /> after <Formula tex="10" /> epochs. 
          The search space included: batch size <Formula tex="B" />, learning rate <Formula tex="l_R" /> (log-scaled), 
          kernel size <Formula tex="k" />, number of convolutional channels <Formula tex="C_c" />, linear layer size <Formula tex="n_h" />, 
          dropout rate <Formula tex="d" />, and activation function <Formula tex="f_A" />.
        </Text>

        <Text as="p" element="p" className="mt-3">
          For the SVM, <Formula tex="\texttt{sklearn.svm.SVC}" /> was used. The search covered the decision scheme 
          (OvO or OvR), kernel function, regularization parameter <Formula tex="C" />, kernel coefficient <Formula tex="\gamma" />, 
          and for the polynomial kernel, degree <Formula tex="d" /> and bias term <Formula tex="\text{coef0}" />.
        </Text>
      </section>

      <HyperparameterTable />


      <section className="mt-10 mb-10">
        <h2 className="text-2xl font-semibold mb-2">III. Results</h2>

        <Text as="p" element="p">
          The convolutional neural network (CNN) achieved the highest accuracy among all models, followed by the support vector machine (SVM) and autoencoder (AE). Final performance metrics on the training, validation, and test sets are summarized in the table below:
        </Text>

        <ModelAccuracyTable />

        <Text as="p" element="p">
          The CNN also demonstrated the highest per-class accuracy and recall, with minimal confusion between similar gestures. Confusion matrices and per-class metrics highlight that the SVM and AE models struggled to maintain consistent performance across all classes.
        </Text>

        <CnnMetricsChart />

        <ConfusionMatrixCNNvsSVM />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">IV. Discussion</h2>

        <Text as="p" element="p">
          CNN performance was primarily improved through dataset balancing and augmentation. Early models failed to correctly classify certain underrepresented classes—such as the letter <code>W</code>—until augmentation addressed class imbalance. Model accuracy could potentially be enhanced further by reducing kernel sizes to capture finer spatial features, but was limited by a <Formula tex="50\,\text{MB}" /> model size constraint, with the final CNN occupying <Formula tex="49\,\text{MB}" />.
        </Text>

        <Text as="p" element="p" className="mt-3">
          The autoencoder underperformed, likely due to the encoder and classifier being trained separately. This prevented joint optimization of features tailored for classification. Attempts to optimize training using Levy flight search algorithms were unstable and ultimately discarded.
        </Text>

        <Text as="p" element="p" className="mt-3">
          SVM training on full-resolution images was infeasible. Dimensionality reduction via PCA to 200 components helped, retaining <Formula tex="90\%" /> of variance while reducing model size. Despite improvements, the SVM still reached <Formula tex="60\,\text{MB}" />. Reducing training data and augmentation helped bring this down to <Formula tex="37\,\text{MB}" />, with only a <Formula tex="1\%" /> drop in accuracy. Replacing PCA with autoencoder-extracted features may further improve SVM performance.
        </Text>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">V. Conclusion</h2>

        <Text as="p" element="p">
          The final CNN classifier was trained for <Formula tex="60" /> epochs on the entire training dataset and achieved a strong test dataset
          accuracy of <Formula tex="96.25\%" />. The convolutional autoencoder reached only <Formula tex="81.99\%" /> accuracy, likely due to the 
          decoupled training of encoder and classifier. In comparison, the SVM classifier reached a respectable <Formula tex="85.21\%" />. While 
          SVMs can be a viable alternative to CNNs for small multi-label tasks with few classes, small images, and moderate data, they scale poorly
          compared to CNNs on larger datasets with high-resolution images and many classes. This limitation remains even after PCA, though convolutional 
          autoencoders may provide feature spaces where SVMs stay competitive
        </Text>
      </section>

    </div></MathJaxContext>
  );
};

export default ReportPage;
