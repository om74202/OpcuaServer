import { useState } from "react"
import { CreateListApi } from "./CreateListApi";

export const CreateListComponent=(nodeId,url)=>{
    const [data,setData]=useState([]);
    setData(CreateListApi(nodeId,url))
    return <div>
        {data.map((subItem,index)=>[
            <li>{subItem}</li>
        ])}
    </div>
}