import { File } from '../types'

export function getPreviousFile(file: File): File | null {
  switch (file) {
    case File.B:
      return File.A
    case File.C:
      return File.B
    case File.D:
      return File.C
    case File.E:
      return File.D
    case File.F:
      return File.E
    case File.G:
      return File.F
    case File.H:
      return File.G
    default:
      return null
  
  }
}

export function getNextFile(file: File): File | null {
  switch (file) {
    case File.A:
      return File.B
    case File.B:
      return File.C
    case File.C:
      return File.D
    case File.D:
      return File.E
    case File.E:
      return File.F
    case File.F:
      return File.G
    case File.G:
      return File.H
    default:
      return null
  }
  
}

export function convertFileToNumber(file: File): number {
  switch (file) {
    case File.A:
      return 1
    case File.B:
      return 2
    case File.C:
      return 3
    case File.D:
      return 4
    case File.E:
      return 5
    case File.F:
      return 6
    case File.G:
      return 7
    case File.H:
      return 8
    default: 
      return 1
  }
}

export function convertNumberToFile(val: number): File {
  switch (val) {
    case 1:
      return File.A
    case 2:
      return File.B
    case 3:
      return File.C
    case 4:
      return File.D
    case 5:
      return File.E
    case 6:
      return File.F
    case 7:
      return File.G
    case 8:
      return File.H
    default:
      return File.A
  }
}