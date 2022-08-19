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
}

export type Activation = {
	
}

export enum connectStatus{
  Connected = "Connected",
  SentByUser1 = "SentByUser1",
  SentByUser2 = "SentByUser2",
  NotConnected = "NotConnected",
}