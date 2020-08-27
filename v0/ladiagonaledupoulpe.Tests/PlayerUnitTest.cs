using System;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ladiagonaledupoulpe.Tests
{
    [TestClass]
    public class PlayerUnitTest
    {
        #region Public methods
        [TestMethod]
        public void TestMethod1()
        {
            Player player = new Player();

            player.Hit(10);
        }
        #endregion
    }
}
