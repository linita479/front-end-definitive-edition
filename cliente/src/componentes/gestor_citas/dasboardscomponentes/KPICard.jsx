const KPICard = ({ label, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
      <div>
        <h3 className="text-gray-700 font-semibold">{label}</h3>
        <p className="text-2xl font-bold text-blue-600">{value}</p>
      </div>
      {icon && <div className="text-4xl text-blue-400">{icon}</div>}
    </div>
  );
};
export default KPICard