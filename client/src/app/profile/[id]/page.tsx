export default function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Profile page</h1>
      <p>Profile ID: {params.id}</p>
    </div>
  );
}
