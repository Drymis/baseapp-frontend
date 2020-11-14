import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({name: 'NotRoundedInteger'})
@Injectable()
export class NotRoundedIntegerPipe implements PipeTransform {
    transform(value: number): number {
        return Math.floor(value);
    }
}