import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const accuracyData = [
  {
    model: "CNN",
    trainSet: "98.89%",
    validationSet: "98.56%",
    testSet: "96.25%",
  },
  {
    model: "SVM",
    trainSet: "97.76%",
    validationSet: "87.62%",
    testSet: "85.21%",
  },
  {
    model: "AE & NN",
    trainSet: "84.94%",
    validationSet: "81.20%",
    testSet: "81.99%",
  },
];

export function ModelAccuracyTable() {
  return (
    <Table className="border bg-white my-6">
      <TableCaption>Final Model Accuracy on Training, Validation, and Test Sets</TableCaption>
      <TableHeader className="bg-gray-200">
        <TableRow>
          <TableHead className="border-l h-12">Model</TableHead>
          <TableHead className="border-l h-12">Train Set</TableHead>
          <TableHead className="border-l h-12">Validation Set</TableHead>
          <TableHead className="border-l h-12">Test Set</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accuracyData.map((data, index) => (
          <TableRow key={index}>
            <TableCell className="border-l h-12">{data.model}</TableCell>
            <TableCell className="border-l h-12">{data.trainSet}</TableCell>
            <TableCell className="border-l h-12">{data.validationSet}</TableCell>
            <TableCell className="border-l h-12">{data.testSet}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}