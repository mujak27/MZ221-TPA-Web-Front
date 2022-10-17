export type TypeUser = {
	ID              : string,
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
	Visits         	: TypeUser[] 
	Follows					: TypeUser[]
	Educations			: TypeEducation[]
	Experiences			: TypeExperience[]
	IsSso 					: boolean
	HasFilledData 	: boolean
}

export type TypeEducation = {
	ID        : string 
	School    : string 
	Field     : string 
	StartedAt : string 
	EndedAt   : string 
}

export type TypeExperience = {
	ID        : string
	Position  : string
	Desc      : string
	Company   : string
	StartedAt : string
	EndedAt   : string
	IsActive  : boolean
}

export type TypeActivity = {
	ID : string
	User : TypeUser
	Text : string
}

export type TypeConnection = {
	connectionStatus : connectStatus,
	text : string,
}

export enum connectStatus{
  Connected = "Connected",
  SentByUser1 = "SentByUser1",
  SentByUser2 = "SentByUser2",
  NotConnected = "NotConnected",
}

export type TypeJob = {
	ID : string
	User : TypeUser
	Text : string
}

export type TypeConnectionRequest = {
	User1 : TypeUser,
	Text : String
}