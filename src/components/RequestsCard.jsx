import RequestCard from "./RequestCard";

export default function RequestsCard({ requests, onAccept, onReject }) {
  return (
    <div className="h-fit rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="text-oscuro mb-6 text-xl font-bold">
        Solicitudes Pendientes ({requests.length})
      </h2>
      <div className="space-y-3">
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            userName={request.userName}
            onAccept={() => onAccept(request)}
            onReject={() => onReject(request.id)}
          />
        ))}
      </div>
    </div>
  );
}
