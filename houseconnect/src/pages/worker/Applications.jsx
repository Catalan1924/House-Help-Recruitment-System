import ApplicationCard from "../../components/applications/ApplicationCard";

const applications = [

    {
        id:1,
        job:"House Help",
        employer:"Mwangi Family",
        status:"Interview",
        date:"12 Jul 2026"
    },

    {
        id:2,
        job:"Cleaner",
        employer:"ABC Apartments",
        status:"Applied",
        date:"10 Jul 2026"
    },

    {
        id:3,
        job:"Nanny",
        employer:"Otieno Family",
        status:"Hired",
        date:"8 Jul 2026"
    }

];

const Applications=()=>{

return(

<div className="space-y-8">

<h1 className="text-4xl font-bold">

My Applications

</h1>

<div className="space-y-5">

{

applications.map((application)=>(

<ApplicationCard

key={application.id}

application={application}

/>

))

}

</div>

</div>

)

}

export default Applications;