const {OPCUAClient, AttributeIds, readAllAttributes, attributeNameById, ReadValueId, BrowseDirection} =require("node-opcua");
 async function browseNodes(session,nodeId,depth=0){
  const logs=[];
  
  const space="  |".repeat(depth);
  const browsedNode=await session.browse(nodeId);
  if(browsedNode.references.length===0 ){
    console.log(space,"leaf node->",nodeId.toString());
    
    return logs.join("\n");
  }
  
  for(const ref of browsedNode.references){
    console.log(space,ref.nodeId.toString());
    logs.push(space,ref.nodeId.toString())
    logs.push(await browseNodes(session,ref.nodeId,depth+1));
  }

  return logs.join("\n");
}

const   main= async (link)=>{

    const client=OPCUAClient.create({endpointmustexist:false});
      await client.connect(link);
      console.log("Connected to the server");
      const session = await client.createSession();
      const output=[];
    
      try{

    const browserResult=await session.browse("RootFolder");
    const RootfolderLength=browserResult.references.length;

    // await browseNodes(session,browserResult.references[0].displayName);
    
    for(let i=0;i<RootfolderLength;i++){
        output.push(await browseNodes(session,browserResult.references[i].nodeId));
    }
    }catch(e){
      console.log(e);
    }
    console.log("Completed")
    

    await session.close();
    await client.disconnect();
    console.log("Disconnected");
    return output;
}
module.exports=main;