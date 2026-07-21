const SalaryBenefits=({

nextStep,

previousStep

})=>{

return(

<div className="bg-white rounded-2xl shadow p-8">

<h2 className="text-3xl font-bold">

Salary & Benefits

</h2>

<div className="grid md:grid-cols-2 gap-6 mt-8">

<input
placeholder="Salary"
className="border rounded-xl p-4"
/>

<select
className="border rounded-xl p-4"
>

<option>

Accommodation

</option>

<option>

Provided

</option>

<option>

Not Provided

</option>

</select>

<select
className="border rounded-xl p-4"
>

<option>

Meals

</option>

<option>

Included

</option>

<option>

Not Included

</option>

</select>

<select
className="border rounded-xl p-4"
>

<option>

Transport

</option>

<option>

Included

</option>

<option>

Not Included

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

export default SalaryBenefits;