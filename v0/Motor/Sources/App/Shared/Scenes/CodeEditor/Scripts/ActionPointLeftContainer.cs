using Godot;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using System;
using System.Collections.Generic;

public class ActionPointLeftContainer : TextureRect
{


	// Called when the node enters the scene tree for the first time.
	public IList<ActionFrame> Frames;
	public override void _Ready()
	{
		
	}

    #region Internal
    private void SetActionPointLeft(int actionPointLeft)
	{
		Vector2 size = this.Texture.GetSize();
		this.RectSize = new Vector2(size.x * actionPointLeft, size.y);
		this.Visible = actionPointLeft > 0; 
	}
    #endregion

}
