import React,{useState, useRef, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faEye, faArrowDownArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Wrapper } from "../style/headerNavStyle";
import {fildDropDown, oredrBy, groupBy} from "../constants/commonConstant";
import "../style/headerNavStyle.css"

const HeadNav = ({onChangeType, onChangeCreatedBy, onChangeCreatedDate, onChangeMOdifiedBy, onChangeMOdifiedDate, onChangePriority, onChangeTages, onChangeGroupByOwner}) => {
    const[showData, setShowData] = useState(false);
    const[showOrderBy, setShowOrderBy] = useState(false);
    const[showGroup, setShowGroup] = useState(false);
    const dropdownRef = useRef(null);
    
    const handleShowFieldData = () =>{
        setShowData(!showData)
    }

    const handleShowOrder = () =>{
        setShowOrderBy(!showOrderBy)
    }

    const handleShowGroup = () =>{
        setShowGroup(!showGroup)
    }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowData(false);
        setShowOrderBy(false);
        setShowGroup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
    <Wrapper>
    <nav className="navbar navbar-expand-lg navbar-light bg-light  px-3 sticky-header sticky-top">
      <a class="navbar-brand" href="#">
        {/* Navbar */}
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse nav-bar main-navcontainer" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <div className="field-container" onClick={handleShowFieldData}>
              <div><FontAwesomeIcon icon={faEye} className={showData ? "active-eye-icon" :"eye-icon"} /></div> 
              <div className={showData ? "filds-style-onclick":''}>Fields</div>
             <div><FontAwesomeIcon icon={faCaretDown} className="drop-icon"/></div> 
            </div>
            {showData && <div className="field-data card card-2" ref={dropdownRef}>
                {fildDropDown.map((item)=>{
                    return <ui>
                    <li> <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" className="eye-icon" onChange={item.id === 1 ? onChangeCreatedBy: item.id === 2 ? onChangeCreatedDate: item.id === 3? onChangeMOdifiedBy : item.id === 4 ? onChangeMOdifiedDate : item.id === 5 ? onChangePriority:item.id === 6 ? onChangeTages:item.id === 8 ? onChangeType:''}/>{item.name}</li>
                </ui>
                })}
            </div>
           }
          </li>

          <li class="nav-item dropdown">
            <div className="field-container" onClick={handleShowOrder}>
              {/* <div><FontAwesomeIcon icon={faEye} className="eye-icon" /></div>  */}
              <div >Order By</div>
              <div><FontAwesomeIcon icon={faCaretDown} className="drop-icon"/></div> 
            </div>
            {showOrderBy && <div className="field-data card card-2" ref={dropdownRef}>
                {oredrBy.map((item)=>{
                    return <ui>
                    <li> <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" className="eye-icon"/>{item.name}</li>
                </ui>
                })}
            </div>
           }
          </li>

          <li class="nav-item dropdown">
            <div className="field-container" onClick={handleShowGroup}>
              {/* <div><FontAwesomeIcon icon={faEye} className="eye-icon" /></div>  */}
              <div >Group By</div>
              <div><FontAwesomeIcon icon={faCaretDown} className="drop-icon"/></div> 
            </div>
            {showGroup && <div className="field-data card card-2" ref={dropdownRef}>
                {groupBy.map((item)=>{
                    return <ui>
                    <li> <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" className="eye-icon" onChange={item.id === 1 ? onChangeGroupByOwner :''}/>{item.name}</li>
                </ui>
                })}
            </div>
           }
          </li>
        </ul>
      </div>
    </nav>
    </Wrapper>
  );
};

export default HeadNav;
