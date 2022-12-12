import React, { useEffect, useState } from "react";
import CustomBlock from "../../Common/CustomBlock";
import { TYPE1, ContainerClass, SubContainerClass, CommonClass, ContentBetweenClass, FullWidth } from "../../utils/constant";
import ProgressBar from "../../utils/ProgressBar";


const MakeCar = ({ carData }) => {
  
  const [valid, setValid] = useState([]); 
  const [mismatched, setMismatched] = useState([]);
  const [missing, setMissing] = useState([]);
  const [defaultCarData, setDefaultCarData] = useState([]);
  const [other, setOther] = useState(0);
  const [companyList, setCompanyList] = useState({});


  useEffect(() => {

    if(carData){
      const missingData = [];
      const mismatchedData = [];
      const validData = [];
      const companies = {};
  
      carData?.map((data) => {
  
        const previousValue = companies[data[TYPE1]];
        previousValue === undefined ? companies[data[TYPE1]] = 1 : companies[data[TYPE1]] = previousValue + 1;
        
        if (data[TYPE1] == undefined || null || "") {
          missingData.push(data);
        } else if (typeof data[TYPE1] != "string") {
          mismatchedData.push(data);
        } else {
          validData.push(data[TYPE1]);
        }
      });
  
      setValid(validData);
      setMismatched(mismatchedData);
      setMissing(missingData);
      setCompanyList(companies);
  
      /* GET INITIAL TWO ELEMENTS */
      if (Object.keys(companies).length > 0) {
        const objData = Object.entries(companies)
          .sort(({ 1: a }, { 1: b }) => parseInt(b) - parseInt(a))
          .slice(0, 2)
          .map(([label, value]) => ({ label, value }));
  
        setDefaultCarData(objData);
  
        const otherData = carData.length - objData[0]?.value - objData[1]?.value;
  
        setOther(otherData);
      }      
    }

  }, [carData]);

  return (
    <div className={ContainerClass}>
      <div className={SubContainerClass}>
        <CustomBlock title={"A. Model"} subTitle={"Compnay of the vehicle"} />
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
            <div>Other({Object.keys(companyList).length - 2})</div>
            <div>
              {carData &&
                other &&
                ((other * 100) / carData.length).toFixed(2)}
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
          unique={Object.keys(companyList)?.length}
        />
      </div>
    </div>
  );
};

export default MakeCar;
