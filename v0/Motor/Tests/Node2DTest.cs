using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Godot;

namespace TestWatUnitTests.Tests
{
	public class Node2DTest : WAT.Test
	{
		private Node2D _scene = new Node2D();

		public override String Title()
		{
			return "Given A Signal Watcher";
		}

		public override void Start()
		{
			// There is no RemoveUserSignal Method apparently.
			this.AddUserSignal("Example");
		}

		public override void Pre()
		{
			this.Watch(this, "Example");
		}

		public override void Post()
		{
			this.UnWatch(this, "Example");
		}

		[Test]
		public void WhenWeWatchASignalFromAnObjectWithNoBoundVariables()
		{
			this.Assert.IsTrue(this._scene.IsClass(nameof(Node2D)));
		}
	}
}
