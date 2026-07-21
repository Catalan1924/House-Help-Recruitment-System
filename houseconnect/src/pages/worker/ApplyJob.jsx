import {
    Briefcase,
    MapPin,
    Wallet,
    Send,
    Paperclip
} from "lucide-react";

import { useState } from "react";

const ApplyJob = () => {

    const [coverLetter, setCoverLetter] = useState("");

    return (

        <div className="max-w-5xl mx-auto space-y-8">

            <div>

                <h1 className="text-4xl font-bold">
                    Apply for Job
                </h1>

                <p className="text-gray-500 mt-2">
                    Review the job details before submitting your application.
                </p>

            </div>

            {/* Job Summary */}

            <div className="bg-white rounded-2xl shadow p-8">

                <div className="flex justify-between">

                    <div>

                        <h2 className="text-3xl font-bold">
                            Live-in House Help
                        </h2>

                        <p className="text-green-700 mt-2">
                            Mwangi Family
                        </p>

                    </div>

                    <Briefcase className="text-green-700"/>
                </div>

                <div className="flex gap-8 mt-8">

                    <span className="flex gap-2">

                        <MapPin size={18}/>

                        Karen

                    </span>

                    <span className="flex gap-2">

                        <Wallet size={18}/>

                        KES 30,000

                    </span>

                </div>

            </div>

            {/* Cover Letter */}

            <div className="bg-white rounded-2xl shadow p-8">

                <label className="font-semibold">

                    Cover Letter

                </label>

                <textarea

                    rows={8}

                    value={coverLetter}

                    onChange={(e)=>setCoverLetter(e.target.value)}

                    className="mt-4 w-full border rounded-xl p-5 outline-none focus:ring-2 focus:ring-green-700"

                    placeholder="Introduce yourself and explain why you're the right candidate..."

                />

            </div>

            {/* Documents */}

            <div className="bg-white rounded-2xl shadow p-8">

                <h2 className="font-bold text-xl">

                    Supporting Documents

                </h2>

                <div className="mt-6">

                    <label className="border-2 border-dashed rounded-2xl h-44 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50">

                        <Paperclip
                            className="mb-4"
                        />

                        Upload CV or Certificate

                        <input
                            hidden
                            type="file"
                        />

                    </label>

                </div>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-5">

                <button className="border px-8 py-3 rounded-xl">

                    Cancel

                </button>

                <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl flex gap-3">

                    <Send/>

                    Submit Application

                </button>

            </div>

        </div>

    );

};

export default ApplyJob;