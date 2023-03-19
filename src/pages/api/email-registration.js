import path from 'path'
import fs from 'fs'

function buildPath() {
  return path.join(process.cwd(), 'data', 'data.json')
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath)
  return JSON.parse(jsonData)
}

export default function handler(req, res) {
  const {method} = req
  const filePath = buildPath()
  const { eventCategories, allEvents } = extractData(filePath)

  if (!allEvents) {
    return res.status(404).json({message: 'Events data not found!'})
  }

  if (method === 'POST') { 
    const { email, eventId } = req.body

    const event = allEvents.find(ev => ev.id === eventId)
    if (event === undefined) {
      return res.status(404).json({message: `The event does not found!`})
    }

    if (event.emails_registered.includes(email)) {
      return res.status(401).json({message: `This email ${email} has been registered! Please select another email`})
    }

    const newAllEvents = allEvents.map(ev => {
      if (ev.id === eventId) {
        return {...ev, emails_registered: [...ev.emails_registered, email]}
      }
      return ev
    })

    fs.writeFileSync(filePath, JSON.stringify({eventCategories, allEvents: newAllEvents}))

    res.status(200).json({message: `You has been registered successfully for email ${email}!`})
  }
}
