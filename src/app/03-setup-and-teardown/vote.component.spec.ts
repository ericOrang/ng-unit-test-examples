import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  let component: VoteComponent;
  beforeEach(() => {
    component = new VoteComponent();
  });
  it('should increment totoalVotes when upvoted', () => {
    component.upVote();
    expect(component.totalVotes).toBe(1);
  });

  it('should decrease totalVotes when downvote', () => {
    component.downVote();
    expect(component.totalVotes).toBe(-1);
  });
});
