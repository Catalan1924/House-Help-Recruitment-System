import { CheckCircle2 } from "lucide-react";

const ReviewPublish=({

previousStep

})=>{

return(

<div className="bg-white rounded-2xl shadow p-8">

<div className="text-center">

<CheckCircle2

size={70}

className="mx-auto text-green-700"

/>

<h2 className="text-4xl font-bold mt-6">

Ready to Publish?

</h2>

<p className="text-gray-500 mt-4">

Review your job information before publishing.

</p>

</div>

<div className="flex justify-between mt-12">

<button

onClick={previousStep}

className="border px-8 py-3 rounded-xl"

>

Back

</button>

<button

className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl"

>

Publish Job

</button>

</div>

</div>

)

}

export default ReviewPublish;