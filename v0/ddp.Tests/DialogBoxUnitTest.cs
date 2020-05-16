using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ddp.Tests
{
    [TestClass]
    public class DialogBoxUnitTest
    {
        #region Public methods
        [TestMethod]
        public void ShouldDisplayTwoMessageWIthTimer()
        {
            DialogBox box = new DialogBox();

            box.MessageList = new List<string>()
            {
                "Hello ça va"
            };

            Assert.IsNotNull(box.Message);
            Assert.IsTrue(box.MessageList[0] == box.Message);
        }
        #endregion
    }
}
