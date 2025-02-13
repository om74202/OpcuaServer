import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'



function App() {
  const [endpoint, setEndpoint] = useState(""); // OPC UA Endpoint
  const [nodes, setNodes] = useState([]); // Stores the root nodes
  const [expandedNodes, setExpandedNodes] = useState({});
  console.log("Front end is up ")
  


  const fetchNodes = async (nodeId = "RootFolder") => {
    try {
      const response = await axios.post("http://localhost:3000/getNodes", {
        url: endpoint,
        nodeId,
      });
      return response.data.nodes;
    } catch (error) {
      console.error("Error fetching nodes:", error);
      return [];
    }
  };

  const handleNodeClick = async (nodeId) => {
    if (expandedNodes[nodeId]) {
      
      setExpandedNodes((prev) => ({ ...prev, [nodeId]: null }));
    } else {
      
      const children = await fetchNodes(nodeId);
      setExpandedNodes((prev) => ({ ...prev, [nodeId]: children }));
      
    }

  };

  const handleConnect = async () => {
    const rootNodes = await fetchNodes();
    setNodes(rootNodes);
  };



  const renderNodes = (nodes,depth=0) => (
    <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          <div onClick={() => handleNodeClick(node.id)} style={{ cursor: "pointer" }}>
            {expandedNodes[node.id] ? "▼" : "▶"} {node.name} {node.value}
          </div>
          {/* for children nodes */}
          <div className='pl-5'>
          {expandedNodes[node.id] && renderNodes(expandedNodes[node.id],depth+1)}
          </div>
          
        </li>
      ))}
    </ul>
  );



  



  
  

  return (
    <div >
      
      <div className='py-4'>
        <h2 >Enter the OPCUA Endpoint url</h2>
      <input className='w-1/2 border' type='text' placeholder='Enter the url' onKeyUp={(e)=>{
        setEndpoint(e.target.value);
      }}/>
      </div>

      <button className=' 
      text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium
       rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
        dark:focus:ring-blue-800
      ' onClick={handleConnect}>Connect</button>
      
      <div className='py-6'>
      {nodes.length > 0 ? renderNodes(nodes) : <p>No nodes loaded.</p>}
      </div>
      
    </div>
    
        )
}

export default App
