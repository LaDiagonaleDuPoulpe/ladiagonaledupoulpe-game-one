using Godot;
using System;

/// <summary>
/// Displays the current quest
/// </summary>
public class CurrentQuest : Node2D
{
	#region Fields
	private Button _showQuests = null;
	private Sprite _icon = null;
	private RichTextLabel _title = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		CanvasLayer layer = this.GetNode<CanvasLayer>("CanvasLayer");
		this._showQuests = layer.GetNode<Button>("ShowQuests");
		this._icon = this._showQuests.GetNode<Sprite>("Icon");
		this._title = this._showQuests.GetNode<RichTextLabel>("Title");
	}

	public void SetVisibility(bool isVisible)
	{
		this._showQuests.Visible = isVisible;
		this._icon.Visible = isVisible;
		this._title.Visible = isVisible;
	}
	#endregion
}
