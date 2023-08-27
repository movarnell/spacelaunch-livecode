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
        "nextOpporunity": format(parseISO(launch.window_start),'MM-dd-yy h:mm aa')
        // console.log(launch.image)

         }
            return launchArray
        })




       
    return (
        <div key={uuidv4()}>
            <h1>Launches</h1>
            <div className="row" key={uuidv4()}>
           
                {launches.map((launch) => {
                    return (
                        <div className='col-3' key={uuidv4()}>
                            <div className='card' key={uuidv4()}>
                                <img src={launch.vehicle.includes("Falcon") ? "src/assets/Falcon_9_logo.svg" : launch.vehicle.includes("Atlas") ? "src/assets/Atlas-V.svg" : launch.vehicle.includes("Firefly") ? "src/assets/Firefly-Logo.svg" : launch.image } className='card-img-top' alt={launch.launchName}/>
                                <div className='card-body' key={uuidv4()}>
                                    <h5 className='card-title'>{launch.provider}</h5>
                                    <p className='card-text'>{launch.vehicle}</p>
                                    <p className='card-text'>{launch.type}</p>
                                    <p className='card-text'>{launch.location}</p>
                                    <p className='card-text'>{launch.nextOpporunity}</p>

                                </div>
                            </div>
                        </div>
                    )
                    
                }

                )}
                
            </div>
        </div>
    )
}

