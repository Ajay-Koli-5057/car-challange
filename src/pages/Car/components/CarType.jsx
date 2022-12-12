import React, { useEffect, useState } from "react";
import ProgressBar from "../../utils/ProgressBar";
import { CommonClass, ContainerClass, ContentBetweenClass, FullWidth, SubContainerClass, TYPE3 } from "../../utils/constant";
import CustomBlock from "../../Common/CustomBlock";

const VehicleClass = ({ carData }) => {

  const [valid, setValid] = useState([]);
  const [mismatched, setMismatched] = useState([]);
  const [missing, setMissing] = useState([]);
  const [defaultCarData, setDefaultCarData] = useState([]);
  const [other, setOther] = useState(0);
  const [vehicleClassList, setVehicleClassList] = useState({});

  useEffect(() => {
    if(carData){
      const missingData = [];
      const mismatchedData = [];
      const validData = [];
      const vehicleClassListData = {};
  
      carData?.map((data) => {
        const previousValue = vehicleClassListData[data[TYPE3]];
  
        previousValue === undefined ? vehicleClassListData[data[TYPE3]] = 1 : vehicleClassListData[data[TYPE3]] = previousValue + 1;
        
        if (data[TYPE3] == undefined || null || "") {
          missingData.push(data[TYPE3]);
        } else if (typeof data[TYPE3] != "string") {
          mismatchedData.push(data[TYPE3]);
        } else {
          validData.push(data[TYPE3]);
        }
      });
  
      setValid(validData);
      setMismatched(mismatchedData);
      setMissing(missingData);
      setVehicleClassList(vehicleClassListData);
  
      /* GET INITIAL TWO ELEMENTS */
  
      if (Object.keys(vehicleClassListData).length > 0) {
        const top2 = Object.entries(vehicleClassListData)
          .sort(({ 1: a }, { 1: b }) => Number(b) - Number(a))
          .slice(0, 2)
          .map(([label, value]) => ({ label, value }));
  
        setDefaultCarData(top2);
  
        const otherData = carData.length - top2[0]?.value - top2[1]?.value;
  
        setOther(otherData);
      }      
    }
  }, [carData]);

  return (
    <div className={ContainerClass}>
      <div className={SubContainerClass}>
        <CustomBlock title={"A. Vehicle Class"} subTitle={"class of vehicle depending on their utility, capacity and weight"} />
        <div className={CommonClass}>
          {carData && defaultCarData && (
            <div className={`${ContentBetweenClass} ${FullWidth}`}>
              <div>{defaultCarData[0]?.label}</div>
              <div className="fw-bold text-primary">
                {(
                  (defaultCarData[0]?.value * 100) /
                  carData.length
                ).toFixed(2)}
                %
              </div>
            </div>
          )}

          {carData && defaultCarData && (
            <div className={`${ContentBetweenClass} ${FullWidth}`}>
              <div>{defaultCarData[1]?.label}</div>
              <div className="fw-bold text-primary">
                {(
                  (defaultCarData[1]?.value * 100) /
                  carData.length
                ).toFixed(2)}
                %
              </div>
            </div>
          )}

          <div className={`${ContentBetweenClass} text-muted fs-6`}>
            <div>Other({Object.keys(vehicleClassList).length - 2})</div>
            <div>
              {carData &&
                other &&
                ((other / carData.length) * 100).toFixed(2)}
              %
            </div>
          </div>
        </div>
      </div>

      <div className="flex-2">
        <ProgressBar
          carData={carData}
          valid={valid}
          mismatched={mismatched}
          missing={missing}
          defaultCarData={defaultCarData}
          unique={Object.keys(vehicleClassList).length}
        />
      </div>
    </div>
  );
};

export default VehicleClass;
