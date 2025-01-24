export interface IPlayer {
    x: number;
    y: number;
    angle: number;
    width: number;
    height: number;
    color: string;
    speed: number;
    dx: number;
    dy: number;
}

export interface IAngle {
    cos_angle: number;
    sin_angle: number;
    angle: number;
}

export interface IRay {
    x: number;
    y: number;
}