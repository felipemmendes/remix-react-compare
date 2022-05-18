export function loader() {
  const robots = `
  # https://www.robotstxt.org/robotstxt.html
  User-agent: *
  Disallow:
  `
  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
