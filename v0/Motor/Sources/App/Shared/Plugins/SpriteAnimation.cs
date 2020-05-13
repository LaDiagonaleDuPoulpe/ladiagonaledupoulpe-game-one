using Godot;
using System;
using System.Threading.Tasks;

[Obsolete("Godot permet de le faire sans script")]
public class SpriteAnimation : Sprite
{
	private int _qteFrame;
	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		_qteFrame = (this.Vframes * this.Hframes)- 1;
		Timer timer = new Timer();
		timer.Connect("timeout", this, "TimerElapsed");
		timer.WaitTime = 0.2f;
		AddChild(timer);
		timer.Start();
		
		
	}

	private async void TimerElapsed()
	{
		if (this.Frame < this._qteFrame)
		{
			this.Frame++;
		}
		else
		{
			this.Frame = 0;
		}
	}

}
