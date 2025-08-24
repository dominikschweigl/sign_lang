'use client'

import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Formula } from "@/components/ui/formula";

const hyperparameterData = [
  {
    model: "Convolutional Neural Network",
    headers: ["B", "l_R", "k", "n_h", "C_c", "d", "f_A"],
    bounds: [
      "[8, 128]",
      "[0.0001, 0.01]",
      "\\{3 \\times 3,\\ 5 \\times 5\\}",
      "[128, 384]",
      "\\{[16,32,64],\\ [48,96,192]\\}",
      "[0.2, 0.5]",
      "\\{\\text{ReLU},\\ \\text{Sigmoid}\\}"
    ],
    selected: [
      "64",
      "0.000218",
      "5 \\times 5",
      "382",
      "[32, 64, 128]",
      "0.2026",
      "\\text{ReLU}"
    ]
  },
  {
    model: "Auto Encoder",
    headers: ["B", "l_R", "k", "n_h", "C_c", "d", "f_A"],
    bounds: [
      "[8, 128]",
      "[0.0001, 0.01]",
      "\\{3\\times3,\\ 5 \\times 5\\}",
      "[128, 512]",
      "\\{[16,32,64],\\ [48,96,192]\\}",
      "[0.2, 0.5]",
      "\\{\\text{ReLU},\\ \\text{Sigmoid}\\}"
    ],
    selected: [
      "64",
      "0.001",
      "3 \\times 3",
      "512",
      "[16, 32, 64]",
      "0.3",
      "\\text{ReLU}"
    ]
  },
  {
    model: "Support Vector Machine",
    headers: ["C", "\\gamma", "d", "\\text{coef0}", "\\text{Kernel}", "\\text{Decision-Scheme}", ""],
    bounds: [
      "[0.01, 1000]",
      "[0.0001, 0.1]",
      "[2, 4]",
      "[0, 1]",
      "\\{\\text{Linear},\\ \\text{Poly},\\ \\text{RBF}\\}",
      "\\{\\text{OvO},\\ \\text{OvR}\\}",
      ""
    ],
    selected: [
      "6",
      "0.01",
      "3",
      "1",
      "\\text{Poly}",
      "\\text{OvR}",
      ""
    ]
  }
];


export function HyperparameterTable() {
  return (
    <Table className="text-center border bg-white mt-6">
      <TableCaption>
        Table I: Hyperparameter Selection for the <Formula tex="\text{CNN}" />,{" "}
        <Formula tex="\text{Autoencoder}" />, and{" "}
        <Formula tex="\text{SVM}" /> Classifiers
      </TableCaption>

        {hyperparameterData.map((model, modelIndex) => (
          <React.Fragment key={modelIndex}>
            <TableHeader className="border-t">

              <TableRow>
                <TableHead colSpan={Math.max(...hyperparameterData.map(m => m.headers.length))} className="text-left h-12 bg-gray-200">
                  {model.model}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

            <TableRow >
              {model.headers.map((header, i) => (
                <TableHead key={i} className="border-l text-center">
                  <Formula tex={header} />
                </TableHead>
              ))}
            </TableRow>

            <TableRow>
              {model.bounds.map((bound, i) => (
                <TableCell key={i} className="border-l">
                  <Formula tex={bound} />
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              {model.selected.map((val, i) => (
                <TableCell key={i} className="border-l">
                  <Formula tex={val} />
                </TableCell>
              ))}
            </TableRow>
            </TableBody>
          </React.Fragment>
        ))}
    </Table>
  );
}