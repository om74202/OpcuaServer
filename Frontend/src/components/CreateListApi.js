import axios from "axios"


export const  CreateListApi=async (nodeId,url)=>{
    const ans=[];
    const response=await axios.post("http://localhost:3000/getNodes",{
        url:url,
        nodeId:nodeId
    })
    ans.push(response.data.nodes);
        return ans;
}