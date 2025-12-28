import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

export async function GET() {
  try {
    // Read the links.txt file from the public directory
    const filePath = join(process.cwd(), "public", "links.txt")
    const fileContent = await readFile(filePath, "utf-8")

    // Split by newlines and filter out empty lines
    const links = fileContent
      .split("\n")
      .map((link) => link.trim())
      .filter((link) => link.length > 0)

    if (links.length === 0) {
      return NextResponse.json({ error: "No links found" }, { status: 404 })
    }

    // Get a random link
    const randomIndex = Math.floor(Math.random() * links.length)
    const randomLink = links[randomIndex]

    return NextResponse.json({ url: randomLink })
  } catch (error) {
    console.error("Error reading links file:", error)
    return NextResponse.json({ error: "Failed to read links" }, { status: 500 })
  }
}
