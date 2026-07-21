const Requirements=({

nextStep,

previousStep

})=>{

return(

<div className="bg-white rounded-2xl shadow p-8">

<h2 className="text-3xl font-bold">

Requirements

</h2>

<div className="grid md:grid-cols-2 gap-6 mt-8">

<input
className="border rounded-xl p-4"
placeholder="Minimum Experience"
/>

<input
className="border rounded-xl p-4"
placeholder="Languages"
/>

<input
className="border rounded-xl p-4"
placeholder="Skills"
/>

<select
className="border rounded-xl p-4"
>

<option>

Education

</option>

<option>

Primary

</option>

<option>

Secondary

</option>

</select>

</div>

<div className="flex justify-between mt-10">

<button

onClick={previousStep}

className="border px-8 py-3 rounded-xl"

>

Back

</button>

<button

onClick={nextStep}

className="bg-green-700 text-white px-8 py-3 rounded-xl"

>

Continue

</button>

</div>

</div>

)

}

export default Requirements;