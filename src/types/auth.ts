export interface AuthRegisterRequest {
  login: string
  password: string
}

export interface AuthRegisterRequest {
  login: string
  name: string
  password: string
}

export interface AuthLoginResponse {
  _id: string
  name: string
  login: string
  token: string
}

export interface AuthRegisterResponse {
  _id: string
  name: string
  login: string
  token: string
}

export interface User {
  _id: string
  login: string
  name: string
  qrCodes: string[]
}

export interface QRCode {
  _id: string
  data: {
    lastname: {
      isPublic: boolean
      value: string
    }
    firstname: {
      isPublic: boolean
      value: string
    }
    surname: {
      isPublic: boolean
      value: string
    }
    phone: {
      isPublic: boolean
      value: string
    }
    email: {
      isPublic: boolean
      value: string
    }
    socialMedia: {
      isPublic: boolean
      value: string
    }
    reward: {
      isPublic: boolean
      value: number
    }
    text: {
      isPublic: boolean
      value: string
    }
    feedbackType: 'email' | 'phone' | 'social'
  }
  authorId: string
  name: string
  qrCode: string
}

export interface PublicFields {
  lastname?: string
  firstname?: string
  surname?: string
  phone?: string
  email?: string
  socialMedia?: string
  reward?: number
  text?: string
  feedbackType: 'email' | 'phone' | 'social'
}

export interface QRCodeUpdate {
  name?: string
  data?: {
    lastname?: {
      isPublic?: boolean
      value?: string
    }
    firstname?: {
      isPublic?: boolean
      value?: string
    }
    surname?: {
      isPublic?: boolean
      value?: string
    }
    phone?: {
      isPublic?: boolean
      value?: string
    }
    email?: {
      isPublic?: boolean
      value?: string
    }
    socialMedia?: {
      isPublic?: boolean
      value?: string
    }
    reward?: {
      isPublic?: boolean
      value?: number
    }
    text?: {
      isPublic?: boolean
      value?: string
    }
    feedbackType?: 'email' | 'phone' | 'social'
  }
}
