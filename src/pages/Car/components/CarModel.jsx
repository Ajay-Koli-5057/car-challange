import React, { useEffect, useState } from "react";
import ProgressBar from "../../utils/ProgressBar";
import { ContainerClass, SubContainerClass, TYPE2 } from "../../utils/constant";
import CustomBlock from "../../Common/CustomBlock";
const ModelCar = ({ carData }) => {
  const [valid, setValid] = useState([]);
  const [mismatched, setMismatched] = useState([]);
  const [missing, setMissing] = useState([]);
  const [defaultCarData, setDefaultCarData] = useState([]);
  const [modelList, setModelList] = useState({});

  useEffect(() => {

    if(carData){
      const missingData = [];
      const mismatchedData = [];
      const validData = [];
      const modelListData = {};
  
      /* FILTER THE ACCURATE DATA */
  
      carData?.map((data) => {
  
        const previousValue = modelListData[data[TYPE2]];
        previousValue === undefined ?  modelListData[data[TYPE2]] = 1 : modelListData[data[TYPE2]] = previousValue + 1;
  
        if (data[TYPE2] == undefined || null || "") {
          missingData.push(data[TYPE2]);
        } else if (typeof data[TYPE2] != "string") {
          mismatchedData.push(data[TYPE2]);
        } else {
          validData.push(data[TYPE2]);
        }
      });
  
      setValid(validData);
      setMismatched(mismatchedData);
      setMissing(missingData);
      setModelList(modelListData);
      /* GET INITIAL TWO ELEMENTS */
      if (Object.keys(modelListData).length > 0) {
        const top2 = Object.entries(modelListData)
          .sort(({ 1: a }, { 1: b }) => Number(b) - Number(a))
          .slice(0, 1)
          .map(([label, value]) => ({ label, value }));
  
        setDefaultCarData(top2);
      }      
    }

  }, [carData]);

  return (
    <div className={ContainerClass}>
      <div className={SubContainerClass}>
        <CustomBlock title={"A. Model"} subTitle={"Car Model"} />

        <div className="mt-5">
          <div className="fs-1 fw-bold text-primary">
            {Object.keys(modelList).length}
          </div>
          <div className="fw-bold">unique values</div>
        </div>
      </div>

      <div className="flex-2">
        <ProgressBar
          carData={carData}
          valid={valid}
          mismatched={mismatched}
          missing={missing}
          defaultCarData={defaultCarData}
          unique={Object.keys(modelList).length}
        />
      </div>
    </div>
  );
};

export default ModelCar;
