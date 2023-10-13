import Image from 'next/image'

function Course(props:{cName: string, cPicure: string}){
    return(
        <div className="w-64 shadow-lg">
            <div className="h-28"> 
                <img className="h-full w-full object-cover" src={props.cPicure} alt={`${props.cName} topic`}/>
            </div>
            <div className="flex justify-between py-4 px-2">
                <p className="text-lg font-medium">{props.cName}</p> 
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0-6a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0z"/></svg>
                </span>
            </div>
        </div>
    );
}

export default Course;