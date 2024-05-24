/* eslint-disable react/jsx-key */


import Papa from 'papaparse';
import {useState} from 'react';
import toast, { Toaster } from 'react-hot-toast';


const Upload = () => {

  const [data,setData] = useState([]);
  const [column,setColumn] = useState('');
  const [feedback,setFeedback] = useState([])
  
  const handleUpload = ()=>{
    const file = document.querySelector('input').files[0];
    Papa.parse(file, {
      complete: (results) => {
        console.log(results);
        setData(results.data)
      }
    });
  }

  const handleAnalyse=()=>{
    let index = data[0].indexOf(column);
    let feedback = data.slice(1).map((row)=>row[index]);
    setFeedback(feedback)
    toast.success('Succesfully')
  }


  return (
    <div className='h-[90vh]'>
         <div className='flex items-center justify-center h-[70%] gap-x-[10rem]'>
              <div className='flex flex-col border-solid h-[30rem] w-[30rem] justify-center text-center items-center gap-y-[5rem]'>
                    <p className='text-5xl'>Upload Your Feedback File Here !</p>
                    <input type='file' 
                    accept='.csv' 
                    onChange={()=>handleUpload()}
                    className='text-gray-100 border border-gray-300  cursor-pointer bg-gray-900 p-[1rem] rounded-md'
                    />
              </div>
              <div className=' bg-black p-[1rem] rounded-md h-[30rem] w-[45rem] flex flex-col justify-center '>
              {
               data.length > 0 ?(
                <>
                         <div className='flex justify-between p-[1.6rem] bg-gray-800 rounded-md'>
                            {
                                    data[0].map((item,index)=>(
                                        <span className='text-gray-200 mr-[3rem]' key={index}>{item}</span>
                                    ))
                                }
                         </div>
                        <div className='flex flex-col thin-scrollbar overflow-y-auto h-[75%] gap-y-[0.8rem]  mt-[1rem]'>
                            {
                                data.slice(1).map((row,index)=>(
                                    <div key={index} className='flex justify-between bg-gray-900  shadow-xl p-[1rem] rounded-md'>
                                        {
                                            row.map((item,index)=>(
                                                <p className={`text-gray-200 ${index === 1 ? 'w-60' : 'w-40'} flex justify-start`} key={index}>{item}</p>
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

export default Upload