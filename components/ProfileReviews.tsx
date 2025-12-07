export default function ProfileReviews() {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">My Reviews</h2>
  
        <div className="space-y-4">
          <div className="border p-4 rounded">
            <p className="font-semibold">Camera Rental</p>
            <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
            <p className="text-gray-600">Great renter. Returned on time!</p>
          </div>
  
          <div className="border p-4 rounded">
            <p className="font-semibold">Speaker Rental</p>
            <p className="text-yellow-500">⭐⭐⭐⭐</p>
            <p className="text-gray-600">Good experience overall.</p>
          </div>
        </div>
      </div>
    );
  }
  