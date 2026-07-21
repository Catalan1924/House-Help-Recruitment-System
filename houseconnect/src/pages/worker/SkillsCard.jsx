const skills = [
  "House Cleaning",
  "Cooking",
  "Laundry",
  "Child Care",
  "Pet Care",
  "Ironing",
  "First Aid",
  "Time Management"
];

const SkillsCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-2xl font-bold">
        Skills
      </h2>

      <div className="flex flex-wrap gap-4 mt-8">

        {skills.map(skill => (

          <span
            key={skill}
            className="bg-green-100 text-green-700 px-5 py-2 rounded-full"
          >
            {skill}
          </span>

        ))}

      </div>

    </div>
  );
};

export default SkillsCard;