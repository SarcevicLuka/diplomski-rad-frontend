import { Watch } from "../lists/types";

interface WatchDetailsTableProps {
  watchDetails: Watch;
}

function WatchDetailsTable({ watchDetails }: WatchDetailsTableProps) {
  return (
    <>
      <div className="text-xl font-medium mt-4">Watch Info:</div>
      <table className="mt-1 w-12 sm:w-12 md:w-5">
        <tbody>
          <tr>
            <td>Brand</td>
            <td>{watchDetails.brand}</td>
          </tr>
          <tr>
            <td>Model</td>
            <td>{watchDetails.model}</td>
          </tr>
          <tr>
            <td>Case diameter</td>
            <td>{watchDetails.diameter} mm</td>
          </tr>
          <tr>
            <td>Lug width</td>
            <td>{watchDetails.lugWidth} mm</td>
          </tr>
          <tr>
            <td>Case material</td>
            <td>{watchDetails.caseMaterial}</td>
          </tr>
          <tr>
            <td>Mechanism model</td>
            <td>{watchDetails.mechanismModel}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default WatchDetailsTable;
