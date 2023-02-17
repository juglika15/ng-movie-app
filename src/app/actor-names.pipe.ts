import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actorNames',
})
export class ActorNamesPipe implements PipeTransform {
  transform(actorsList: string): string {
    return actorsList
      .split(', ')
      .map((name) => {
        const firstSpaceIndex = name.indexOf(' ');
        return name.slice(0, firstSpaceIndex);
      })
      .join(', ');
  }
}
