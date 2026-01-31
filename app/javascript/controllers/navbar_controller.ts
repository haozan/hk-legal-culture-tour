import { Controller } from "@hotwired/stimulus"

export default class extends Controller<HTMLElement> {
  static targets = ["mobileMenu"]

  declare readonly mobileMenuTarget: HTMLElement

  connect(): void {
    console.log("Navbar connected")
  }

  disconnect(): void {
    console.log("Navbar disconnected")
  }

  toggleMenu(): void {
    this.mobileMenuTarget.classList.toggle("hidden")
  }
}
