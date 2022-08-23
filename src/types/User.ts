export type User = {
	ID              : string
	Email           : string
	Password        : string
	FirstName       : string
	LastName        : string
	MidName         : string
	IsActive        : boolean
	ProfilePhoto    : string
	BackgroundPhoto : string
	Headline        : string
	Pronoun         : string
	ProfileLink     : string
	About           : string
	Location        : string
	Visits          : User[] 
	Follows					: User[]
	Educations			: Education[]
	Experiences			: Experience[]
}

export type Education = {
	ID        : string 
	School    : string 
	Field     : string 
	StartedAt : string 
	EndedAt   : string 
}

export type Experience = {
	ID        : string
	Position  : string
	Desc      : string
	Company   : string
	StartedAt : string
	EndedAt   : string
	IsActive  : boolean
}

export type Activity = {
	ID : string
	User : User
	Text : string
}

export enum connectStatus{
  Connected = "Connected",
  SentByUser1 = "SentByUser1",
  SentByUser2 = "SentByUser2",
  NotConnected = "NotConnected",
}

