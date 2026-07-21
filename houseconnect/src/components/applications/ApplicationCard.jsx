import {
Calendar,
ChevronRight
} from "lucide-react";

const colors={

Applied:"bg-yellow-100 text-yellow-700",

Interview:"bg-blue-100 text-blue-700",

Hired:"bg-green-100 text-green-700",

Rejected:"bg-red-100 text-red-700"

}

const ApplicationCard=({application})=>{

return(

<div className="bg-white rounded-2xl shadow p-6">

<div className="flex justify-between">

<div>

<h2 className="text-xl font-bold">

{application.job}

</h2>

<p className="text-green-700">

{application.employer}

</p>

<div className="flex gap-2 mt-4 text-gray-500">

<Calendar size={18}/>

{application.date}

</div>

</div>

<div className="flex flex-col items-end gap-4">

<span className={`px-4 py-2 rounded-full ${colors[application.status]}`}>

{application.status}

</span>

<button className="text-green-700 flex gap-2">

View

<ChevronRight size={18}/>

</button>

</div>

</div>

</div>

)

}

export default ApplicationCard;