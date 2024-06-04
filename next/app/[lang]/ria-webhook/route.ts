export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url)
  // const id = searchParams.get('id')
  console.log(request.url);

  return Response.json({
    data: request.url,
  });
}
