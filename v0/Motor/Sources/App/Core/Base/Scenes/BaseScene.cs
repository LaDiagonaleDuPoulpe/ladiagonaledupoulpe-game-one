using Godot;
using ladiagonaledupoulpe.Sources.App.Assets.Settings.Models;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.DialogBox;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Base.Scenes
{
	/// <summary>
	/// Parent scene of all scene (root and active scenes)
	/// </summary>
	public abstract class BaseScene : Node2D
	{
		#region Fields
		#region Signals
		[Signal]
		public delegate void ShowBox();
		#endregion

		private LoadingScene _loadingScene = null;
		private IDialoxBoxManager _dialoxBoxManager = null;
		#endregion

		#region Public methods
		public override void _Ready()
		{
			base._Ready();

			this.LoadingScene = this.GetNode<LoadingScene>("/root/LoadingScene");
			this.DialoxBoxManager = this.GetNode<IDialoxBoxManager>("/root/DialoxBoxManager");
		}
		#endregion

		#region Properties
		/// <summary>
		/// Manager of the dialog box
		/// </summary>
		public IDialoxBoxManager DialoxBoxManager { get => this._dialoxBoxManager; private set => this._dialoxBoxManager = value; }

		/// <summary>
		/// Scene that loads other scene.
		/// It prepare all resources before loading scene
		/// </summary>
		public LoadingScene LoadingScene { get => this._loadingScene; private set => this._loadingScene = value; }
		
		#endregion
	}
}
