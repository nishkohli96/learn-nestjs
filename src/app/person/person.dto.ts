import { IsString } from 'class-validator';
import { CheckIntPipe } from '../../utils/pipetransform';

// export class CheckReqDTO {
//     ParseIntPipe()
//     id: string;
// }

export class AddPersonDTO {
    @IsString()
    fullName: string;
}
