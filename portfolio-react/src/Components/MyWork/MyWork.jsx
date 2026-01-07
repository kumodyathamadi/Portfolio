import React from 'react'
import './MyWork.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import mywork_data from '../../assets/mywork_data'
import arrow_icon from "../../assets/arrow_icon.svg";

function MyWork() {
  return (
    <div id="projects" className="projects">
    <div id="work" className='mywork'>
        <div className='mywork-title'>
            <h1>My Projects</h1>
            <img src={theme_pattern} alt=''/>
        </div>
      
      <div className='mywork_container'>
        {mywork_data.map((work,index)=>{
            return <img key = {index} src={work.w_img} alt=''/>
        })}
      </div>

      <div className='mywork_showmore'>
        <p>Show More</p>
        <img src={arrow_icon} alt=''/>
      </div>
    </div>
    </div>
  )
}

export default MyWork
