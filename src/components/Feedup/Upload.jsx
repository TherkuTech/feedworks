/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */


import * as Papa from 'papaparse';
import {useState} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { feedbacks_received , analysized_feedback } from '../../utils/redux/feedback_slice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as XLSX from 'xlsx';


const Upload = (props) => {
  const { setHomeNavi }  = props;
  const [data,setData] = useState([]);
  const [column,setColumn] = useState('');
  const dispatch = useDispatch();

  const handleUpload = () => {
    const file = document.querySelector('input').files[0];
    const fileName = file.name;
    const fileExe = fileName.split('.').pop().toLowerCase();

    if (fileExe === 'csv') {
      parseCSV(file);
    } else if (fileExe === 'xlsx' || fileExe === 'xls') {
      parseXLSX(file);
    } else {
      alert('Unsupported file type');
    }
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        console.log(results);
        setData(results.data);
      }
    });
  };

  const parseXLSX = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data,{type: 'array'});
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const feedData = XLSX.utils.sheet_to_json(worksheet,{header: 1});
      console.log(feedData);
      setData(feedData);
    };
    reader.readAsArrayBuffer(file);
  };


  const handle_feedback_analysis = async (form_data) => {
    try {
      const response = await axios.post('http://localhost:5000/llm/categories', { data: form_data });
      const data = response.data;
      dispatch(analysized_feedback(data.data))
      return true;
    } catch (err) {
      console.log(err)
      return false;
    }
  }


  const handleAnalyse= async ()=>{
    let index = data[0].indexOf(column);
    let feedback = data.slice(1).map((row)=>row[index]);
    if(! await handle_feedback_analysis(feedback)){
      dispatch(feedbacks_received(feedback))
      toast.error('Failed to analyse feedback , Retry');
    }else{
      setHomeNavi(2);
    }
  }


  return (
    <div className='h-[90vh] flex flex-col items-center justify-center gap-[16px]'>
         <div className='flex flex-col lg:flex-row items-center justify-center h-[70%] gap-x-[10rem]'>
              <div className='flex flex-col border-solid h-[30rem] w-[30rem] justify-center text-center items-center gap-y-[5rem]'>
                    <p className='text-5xl'>Upload Your Feedback File Here !</p>
                    <input type='file' 
                    accept='.csv,.xlsx' 
                    onChange={()=>handleUpload()}
                    className='text-gray-100 border border-gray-300  cursor-pointer bg-gray-900 p-[1rem] rounded-md'
                    />
              </div>
              <div className=' bg-black p-[1rem] rounded-md h-[30rem] w-[45rem] flex flex-col justify-center '>
              {
               data.length > 0 ?(
                <>
                         <div className='flex overflow-auto thin-scrollbar justify-between p-[1.6rem] bg-gray-800 rounded-md'>
                            {
                                    data[0].map((item,index)=>(
                                        <span className='text-gray-200 mr-[3rem]' key={index}>{item}</span>
                                    ))
                                }
                         </div>
                        <div className='flex flex-col thin-scrollbar  overflow-auto h-[75%] gap-y-[0.8rem]  mt-[1rem]'>
                            {
                                data.slice(1).map((row,index)=>(
                                    <div key={index} className='flex justify-between bg-gray-900  shadow-xl p-[1rem] rounded-md'>
                                        {
                                            row.map((item,index)=>(
                                                <p className={`text-gray-200 ${index === 1 ? 'w-60' : 'w-40'}  flex justify-start`} key={index}> {item.length > 25 ? `${item.substring(0, 20)}...` : item}</p>

                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                </>
            ):(
                <p className='text-center text-3xl text-gray-600'>
                    Preview your uploaded csv
                </p>
            )
         }
              </div>
         </div>
         <div className='flex flex-col items-center justify-center w-full gap-y-[2rem]'>
                <input 
                type='text'
                placeholder='Enter Column name containing feedback'
                className='text-gray-7  00 border border-gray-300 text-center placeholder:text-center cursor-pointer bg-gray-300 p-[1rem] rounded-md w-[30rem]'
                onChange={(e)=>setColumn(e.target.value)}
                />
                <button className='bg-black text-gray-200 p-[1rem] rounded-md hover:bg-gray-800' onClick={()=>handleAnalyse()}>Analyse you feedback</button>
              
         </div>
         <Toaster/>
    </div>
  )
}

export default Upload;