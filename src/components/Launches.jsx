import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import {format, parseISO} from 'date-fns'

export default function Launches({launch, patch}) {

console.log(launch);

    const launches = launch.map((launch) => {
       let launchArray = {
        "key": launch.id,
        "image": launch.image,
        "vehicle": launch.rocket.configuration.name,
        "provider": launch.launch_service_provider.name,  
        "type": launch.launch_service_provider.type, 
        "location": launch.pad.location.name,
        "nextOpporunity": format(parseISO(launch.window_start),'MM-dd-yy h:mm aa'),
        "launchStatus": launch.status.name,
        "statusDescription": launch.status.description,
         }
            return launchArray
        })

 


       
    return (
        <div key={uuidv4()}>
            <h1 className='display-5 text-center'>Upcoming Launches</h1>
            <p className='text-center fw-bold'>Next Launch on {launches[0].nextOpporunity}</p>
            <div className="row m-4" key={uuidv4()}>
           
                {launches.map((launch) => {
                    return (
                        <div className='col-xsm-12 col-md-6 col-lg-6 col-xl-6 pb-3' key={uuidv4()}>
                            <div className='card shadow-lg' key={uuidv4()}>
                                <div className="row">
                                    <div className="col-4">
                                <img src={launch.vehicle.includes("Falcon") ? "src/assets/Falcon_9_logo.svg" : launch.vehicle.includes("Atlas") ? "src/assets/Atlas-V.svg" : launch.vehicle.includes("Firefly") ? "src/assets/Firefly-Logo.svg" : launch.image } className='cardImages' alt={launch.launchName}/>
                                </div>
                                <div className="col-8">
                                <div className='card-body' key={uuidv4()}>
                                    <h5 className='card-title'>{launch.provider}</h5>
                                    <p className='card-text'>{launch.vehicle}</p>
                                    <p className='card-text'>Mission Type: {launch.type}</p>
                                    <p className='card-text'>Location: {launch.location}</p>
                    
                                    <p className='fw-bold card-text'>Status: {launch.launchStatus}</p>
                                    <p className='card-text'>{launch.statusDescription}</p>
                                    <p className='card-text'>Launch window opens: {launch.nextOpporunity}</p>

                                </div></div></div>
                                
                               
                            </div>
                        </div>
                    )
                    
                }

                )}
                
            </div>
        </div>
    )
}

