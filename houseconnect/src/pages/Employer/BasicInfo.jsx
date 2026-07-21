const BasicInfo=({nextStep})=>{

return(

<div className="bg-white rounded-2xl shadow p-8">

<h2 className="text-3xl font-bold">

Basic Information

</h2>

<div className="grid md:grid-cols-2 gap-6 mt-8">

<input
className="border rounded-xl p-4"
placeholder="Job Title"
/>

<select
className="border rounded-xl p-4"
>

<option>

Job Type

</option>

<option>

Live-in

</option>

<option>

Live-out

</option>

<option>

Part-time

</option>

</select>

<input
className="border rounded-xl p-4"
placeholder="County"
/>

<input
className="border rounded-xl p-4"
placeholder="Town"
/>

</div>

<textarea

rows={6}

placeholder="Job Description"

className="mt-6 w-full border rounded-xl p-5"

/>

<button

onClick={nextStep}

className="mt-8 bg-green-700 text-white px-8 py-3 rounded-xl"

>

Continue

</button>

</div>

)

}

export default BasicInfo;