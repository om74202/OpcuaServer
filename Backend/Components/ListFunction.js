const {OPCUAClient, BrowseDirection} =require("node-opcua");
//  async function browseNodes(session,nodeId,depth=0){
//   const logs=[];
//   const space="  |".repeat(depth);
//   const nodes=await session.browse(nodeId);
//   if(nodes.references.length===0 ){
//     logs.push(space,"leaf node->",nodeId.toString(),"     ",nodes.references.displayName);
//     return logs;
//   }

//   for(const ref of nodes.references){
//     console.log(space,ref.nodeId.toString());
//     logs.push(space,ref.nodeId.toString())
    
//   }
//   return logs;
// }

const   getNodes= async (link)=>{

    const client=OPCUAClient.create({endpointmustexist:false});
      await client.connect(link);
      console.log("Connected to the server");
      const session = await client.createSession();
      const output=[];
    
      try{

    const RootFolder=await session.browse("ns=3;s=85/0:Simulation");
    const name=RootFolder.references[0].browseName.name;
    console.log(name);
    const RootfolderLength=RootFolder.references.length;
    console.log(RootfolderLength);

  
    RootFolder.references.forEach(async (ref)=>{
        output.push(ref.displayName.text,"  ",ref.nodeId);
    })
    
    
    }catch(e){
      console.log(e);
    }

    await session.close();
    await client.disconnect();
    console.log("Disconnected");
    return output;
}
module.exports=getNodes;